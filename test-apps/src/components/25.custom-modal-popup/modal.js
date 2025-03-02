export default function Modal({ id, header, body, footer, onClose }) {
    return (
        <div className="modal" id={id || 'custom-id'}>
            <div className="modal-content">
                <div className="modal-header">
                    <span onClick={onClose} className="close-modal-icon">&times;</span>
                    <h2>{header ? header : 'Custom Header'}</h2>
                </div>
                <div className="modal-body">
                    {body ? (
                        body
                    ) : (
                        <div>This is our custom modal body.</div>
                    )}
                </div>
                <div className="modal-footer">{footer ? footer : <h2>Custom Footer</h2>}</div>
            </div>
        </div>
    );
}