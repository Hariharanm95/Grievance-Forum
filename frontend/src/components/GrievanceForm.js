import { useState } from "react";
import { useGrievancesContext } from "../hooks/useGrievancesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const GrievanceForm = () => {
    const { dispatch } = useGrievancesContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in to create a grievance');
            return;
        }

        const grievance = { title, description };

        const response = await fetch('/api/grievances/', {
            method: 'POST',
            body: JSON.stringify(grievance),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            setTitle('');
            setDescription('');
            setError(null);
            setEmptyFields([]);
            console.log('New grievance added', json);
            dispatch({ type: "CREATE_GRIEVANCE", payload: json });
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Create a New Grievance</h3>
            <hr/>

            <label>Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
                placeholder="Title"
            />

            <label>Description:</label>
            <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
                placeholder="Description"
            ></textarea>

            <button>Create Grievance</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default GrievanceForm;
