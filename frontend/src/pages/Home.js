import { useEffect } from "react";
import { useGrievancesContext } from "../hooks/useGrievancesContext"; // Import the GrievancesContext
import { useAuthContext } from "../hooks/useAuthContext";

// Import components
import GrievanceDetails from "../components/GrievanceDetails"; // Replace with your GrievanceDetails component
import GrievanceForm from "../components/GrievanceForm"; // Replace with your GrievanceForm component

const Home = () => {
  const { grievances, dispatch } = useGrievancesContext(); // Use the GrievancesContext
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchGrievances = async () => {
      const response = await fetch('/api/grievances', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_GRIEVANCES', payload: json }); // Use SET_GRIEVANCES action type
      }
    };

    if (user) {
      fetchGrievances();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <GrievanceForm /> {/* Replace with your GrievanceForm component */}
      <div className="grievances">
      <h3>Your Grievances</h3>
      <hr />
        {grievances && grievances.map((grievance) => (
          <GrievanceDetails key={grievance._id} grievance={grievance} /> 
        ))}
      </div>
    </div>
  );
};

export default Home;
