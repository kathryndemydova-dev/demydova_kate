import {useEffect} from "react";
import {createPortal} from "react-dom";

export interface NotificationProps {
    message: string,
    type?: "success" | "error" | "info",
    duration?: number,
    onClose: () => void,
}

export default function CustomNotification({
                                               message,
                                               type = "info",
                                               duration = 3000,
                                               onClose,
                                           }: NotificationProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const backgroundColors: Record<NonNullable<NotificationProps["type"]>, string> = {
        success: "#28a745",
        error: "#dc3545",
        info: "#007bff",
    };

    const element = (
        <div
            style={{
                position: "fixed",
                top: "20px",
                right: "20px",
                zIndex: 9999,
                backgroundColor: backgroundColors[type],
                color: "#fff",
                padding: "12px 16px",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: 500,
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                maxWidth: "300px",
                pointerEvents: "none",
            }}
        >
            {message}
        </div>
    );

    const container = document.getElementById("notification-root");
    if (!container) {
        console.error('Notification container "#notification-root" not found in index.html');
        return null;
    }

    return createPortal(element, container);
}