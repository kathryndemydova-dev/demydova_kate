import "./FAQ.css";

const FAQ = () => {
    return (
        <div className="container">
            <h2>FAQ</h2>
            <ul>
                <li>
                    <strong>What is this app for?</strong><br />
                    It’s a CRM system for storing and managing clients and payments.
                </li>
                <li>
                    <strong>How do I add a new client?</strong><br />
                    Click “Add Client” in the top menu and fill out the form.
                </li>
                <li>
                    <strong>How do I edit a client’s details?</strong><br />
                    Click the “Edit” button on the desired client’s card.
                </li>
                <li>
                    <strong>What is a client status?</strong><br />
                    The status reflects the current state (e.g., Active, Debtor, etc.).
                </li>
                <li>
                    <strong>Can I delete a client?</strong><br />
                    Yes. Click “🗑 Delete” on the client card and confirm.
                </li>
            </ul>
        </div>
    );
};

export default FAQ;