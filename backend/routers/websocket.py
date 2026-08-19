from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from services.notification_service import notification_manager

router = APIRouter(tags=["websocket"])

@router.websocket("/ws/dashboard")
async def ws_dashboard_endpoint(websocket: WebSocket):
    await notification_manager.connect(websocket)
    try:
        await websocket.send_json({
            "type": "INITIAL_HANDSHAKE",
            "message": "Connected to Rakshak AI Live Tactical Telemetry Bus",
            "status": "ONLINE"
        })
        while True:
            data = await websocket.receive_text()
            # Echo ping-pong or handle client messages
            if data == "ping":
                await websocket.send_json({"type": "pong"})
    except WebSocketDisconnect:
        notification_manager.disconnect(websocket)