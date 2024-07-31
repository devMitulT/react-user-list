const MyForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const performCRUDOperation = () => {
    // Show loader
    setIsLoading(true);
    
    // Simulate API call with a delay using Promise
    new Promise((resolve) => {
    setTimeout(() => {
    // Simulate CRUD operation
    // Replace with actual CRUD logic (updateData(), deleteData(), insertData())
    console.log('CRUD operation completed.');
    
    // Resolve the promise after the operation completes
    resolve();
    }, 1000); // Simulated delay of 1 second (1000 milliseconds)
    }).then(() => {
    // After the operation completes, hide loader
    setIsLoading(false);
    });
    };
    
    return (
    <div>
    {/* Conditionally render loader */}
    {isLoading && <Loader />}
    
    {/* Your form and other components */}
    <form onSubmit={performCRUDOperation}>
    {/* Form fields */}
    <button type="submit">Perform Operation</button>
    </form>
    </div>
    );
    };
    
    export default MyForm;