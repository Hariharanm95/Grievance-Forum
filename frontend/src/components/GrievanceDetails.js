import { useGrievancesContext } from "../hooks/useGrievancesContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const GrievanceDetails = ({ grievance }) => {
    const { dispatch } = useGrievancesContext();
    const { user } = useAuthContext();

    const handleClick = async () => {
        if (!user) {
            return;
        }

        const response = await fetch('/api/grievances/' + grievance._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        if (response.ok) {
            const json = await response.json();
            dispatch({ type: 'DELETE_GRIEVANCE', payload: json });
        }
    }

    return (
        <div className="grievance-details">
            <h4>{grievance.title}</h4>
            {/* <hr style={{
                maxWidth:"80%"
            }}/> */}
            <p><strong>Description:</strong> {grievance.description}</p>
            <p>{formatDistanceToNow(new Date(grievance.createdAt), { addSuffix: true })}</p>
            {user && (
                <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
            )}
        </div>
    );
}

export default GrievanceDetails;
