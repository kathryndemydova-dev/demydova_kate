export interface ArrowButtonProps {
    direction: "left" | "right";
    onClick: () => void;
    disabled: boolean;
}

function ArrowButton({direction, onClick, disabled}: ArrowButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-disabled={disabled}
            className="page-link"
            style={{
                opacity: disabled ? 0.4 : 1,
                pointerEvents: disabled ? 'none' : 'auto'
            }}
        >
            {direction === 'left' ? '←' : '→'}
        </button>
    );
}

export default ArrowButton;