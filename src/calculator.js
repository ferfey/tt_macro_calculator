const Calculator = () => {
    // State declarations
    const [data, setData] = React.useState({
        gender: '',
        weight: '',
        height: '',
        bodyFat: '',
        activity: '',
        goal: ''
    });
    const [results, setResults] = React.useState(null);
    const [showCustomize, setShowCustomize] = React.useState(false);
    const [customCarbs, setCustomCarbs] = React.useState(120);
    const [proteinMultiplier, setProteinMultiplier] = React.useState(1);
    const [leanMass, setLeanMass] = React.useState(0);

    // Calculation logic
    const calculate = (e) => {
        e.preventDefault();
        const weight = parseFloat(data.weight);
        const height = parseFloat(data.height);
        const bodyFat = parseFloat(data.bodyFat);
        
        const calculatedLeanMass = weight * (1 - (bodyFat / 100));
        setLeanMass(calculatedLeanMass);
        
        let bmr = (data.gender === 'male')
            ? (10 * weight * 0.453592) + (6.25 * height * 2.54) - (5 * 25) + 5
            : (10 * weight * 0.453592) + (6.25 * height * 2.54) - (5 * 25) - 161;
        
        const multipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            very: 1.725
        };
        
        const tdee = bmr * multipliers[data.activity];
        const activityCalories = tdee - bmr;
        
        let targetCalories = tdee;
        let calorieAdjustment = 0;
        
        if (data.goal === 'lose') {
            targetCalories *= 0.8;
            calorieAdjustment = -20;
        } else if (data.goal === 'gain') {
            targetCalories *= 1.1;
            calorieAdjustment = 10;
        }

        updateMacros(targetCalories, calculatedLeanMass, {
            bmr: Math.round(bmr),
            activityCalories: Math.round(activityCalories),
            tdee: Math.round(tdee),
            calorieAdjustment
        });
    };
// Update macros calculation
    const updateMacros = (calories, currentLeanMass = leanMass, energyData = null) => {
        const protein = Math.round(currentLeanMass * proteinMultiplier);
        const carbs = customCarbs;
        const fat = Math.max(0, Math.round((calories - (protein * 4) - (carbs * 4)) / 9));

        setResults({
            calories: Math.round(calories),
            protein,
            carbs,
            fat,
            energyData
        });
    };

    // Effect hook for customization updates
    React.useEffect(() => {
        if (results) {
            updateMacros(results.calories);
        }
    }, [customCarbs, proteinMultiplier]);

    // Component render
    return (
        <div className="calculator-card">
            <form onSubmit={calculate}>
                {/* Gender Selection */}
                <div className="form-group">
                    <label>Gender</label>
                    <div className="gender-group">
                        <button 
                            type="button"
                            className={`gender-button ${data.gender === 'male' ? 'selected' : ''}`}
                            onClick={() => setData({...data, gender: 'male'})}
                        >
                            Male
                        </button>
                        <button 
                            type="button"
                            className={`gender-button ${data.gender === 'female' ? 'selected' : ''}`}
                            onClick={() => setData({...data, gender: 'female'})}
                        >
                            Female
                        </button>
                    </div>
                </div>

                {/* Basic Measurements */}
                <div className="form-group number-input-group">
                    <label>Weight (lbs)</label>
                    <input 
                        type="number"
                        className="input-field"
                        value={data.weight}
                        onChange={e => setData({...data, weight: e.target.value})}
                    />
                </div>

                <div className="form-group number-input-group">
                    <label>Height (inches)</label>
                    <input 
                        type="number"
                        className="input-field"
                        value={data.height}
                        onChange={e => setData({...data, height: e.target.value})}
                    />
                </div>

                <div className="form-group number-input-group">
                    <label>Body Fat %</label>
                    <input 
                        type="number"
                        className="input-field"
                        value={data.bodyFat}
                        onChange={e => setData({...data, bodyFat: e.target.value})}
                    />
                </div>
