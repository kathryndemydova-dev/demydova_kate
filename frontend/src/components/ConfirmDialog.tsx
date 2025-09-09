import {confirmable, createConfirmation, type ConfirmDialogProps} from 'react-confirm';

const MyDialog = ({proceed, message}: ConfirmDialogProps<{ message: string }, boolean>) => (

    <div className="dialog">
        <p>{message}</p>
        <div className="dialog-buttons">
            <button onClick={() => proceed(true)}>Yes</button>
            <button onClick={() => proceed(false)}>No</button>
        </div>
    </div>

);

export const confirm = createConfirmation(confirmable(MyDialog));