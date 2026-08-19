from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from database import get_db
from models.schema import User, UserRole, AuditLog
from services.auth_service import verify_password, create_access_token, get_current_user

router = APIRouter(prefix="/api/auth", tags=["auth"])

class LoginRequest(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: str
    username: str
    full_name: Optional[str]
    role: str
    created_at: Optional[datetime]

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

@router.post("/login", response_model=TokenResponse)
async def login(credentials: LoginRequest, db: AsyncSession = Depends(get_db)):
    stmt = select(User).where(User.username == credentials.username)
    result = await db.execute(stmt)
    user = result.scalar_one_or_none()

    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Update last login
    user.last_login = datetime.utcnow()
    
    # Audit log
    audit = AuditLog(
        id=f"audit_{int(datetime.utcnow().timestamp()*1000)}",
        user_id=user.id,
        role=user.role.value,
        action="USER_LOGIN",
        entity_type="AUTH",
        entity_id=user.id,
        details={"username": user.username, "ip": "127.0.0.1"}
    )
    db.add(audit)
    await db.commit()

    token = create_access_token(data={"sub": user.username, "role": user.role.value})
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "username": user.username,
            "full_name": user.full_name,
            "role": user.role.value,
            "created_at": user.created_at
        }
    }

@router.post("/token", response_model=TokenResponse)
async def login_oauth(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    return await login(LoginRequest(username=form_data.username, password=form_data.password), db)

@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "full_name": current_user.full_name,
        "role": current_user.role.value,
        "created_at": current_user.created_at
    }

@router.get("/demo-users")
async def get_demo_users():
    return {
        "users": [
            {
                "username": "commander",
                "role": "commander",
                "full_name": "Brigadier V. S. Chauhan (Commanding Officer)",
                "description": "Full tactical control, simulation triggers, dispatch override"
            },
            {
                "username": "officer1",
                "role": "officer",
                "full_name": "Inspector Rajesh Kumar (Duty Officer)",
                "description": "Live monitoring, patrol assignment, incident review & reporting"
            },
            {
                "username": "observer",
                "role": "observer",
                "full_name": "Observer Team Alpha (Logistics & Recon)",
                "description": "Read-only operational picture and equipment telemetry"
            }
        ]
    }