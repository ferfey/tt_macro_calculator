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
{/* Activity Level Selection */}
                <div className="form-group">
                    <label>Daily Activity Level (excluding workouts)</label>
                    <div className="activity-group">
                        <button 
                            type="button"
                            className={`activity-button ${data.activity === 'sedentary' ? 'selected' : ''}`}
                            onClick={() => setData({...data, activity: 'sedentary'})}
                        >
                            Sedentary
                            <div className="activity-description">
                                Desk job, little to no exercise, and no strenuous hobbies. 
                                • Sitting most of the day
                                • Little walking
                                • No physically demanding tasks
                                Multiplier: 1.2
                            </div>
                        </button>
                        
                        <button 
                            type="button"
                            className={`activity-button ${data.activity === 'light' ? 'selected' : ''}`}
                            onClick={() => setData({...data, activity: 'light'})}
                        >
                            Lightly Active
                            <div className="activity-description">
                                Office job with some walking during day, or standing job with little movement.
                                • Regular daily walking
                                • Standing or moving 2-3 hours per day
                                • Light housework
                                Multiplier: 1.375
                            </div>
                        </button>
                        
                        <button 
                            type="button"
                            className={`activity-button ${data.activity === 'moderate' ? 'selected' : ''}`}
                            onClick={() => setData({...data, activity: 'moderate'})}
                        >
                            Moderately Active
                            <div className="activity-description">
                                Job with physical activity or daily walking/standing requirements.
                                • Retail worker
                                • Teacher
                                • Construction (light work)
                                • Most stay-at-home parents
                                Multiplier: 1.55
                            </div>
                        </button>
                        
                        <button 
                            type="button"
                            className={`activity-button ${data.activity === 'very' ? 'selected' : ''}`}
                            onClick={() => setData({...data, activity: 'very'})}
                        >
                            Very Active
                            <div className="activity-description">
                                Physically demanding job or highly active lifestyle.
                                • Construction (heavy work)
                                • Farmer
                                • Professional athlete
                                • Full-time athlete
                                Multiplier: 1.725
                            </div>
                        </button>
                    </div>
                    <div style={{marginTop: '10px', fontSize: '14px', color: '#666'}}>
                        Note: Do not include workout activity here. Select based on your regular daily activity level only.
                    </div>
                </div>

                {/* Goal Selection */}
                <div className="form-group">
                    <label>Goal</label>
                    <select 
                        className="input-field"
                        value={data.goal}
                        onChange={e => setData({...data, goal: e.target.value})}
                    >
                        <option value="">Select Goal</option>
                        <option value="lose">Lose Fat</option>
                        <option value="maintain">Maintain</option>
                        <option value="gain">Gain Muscle</option>
                    </select>
                </div>

                <button type="submit" className="button">Calculate Macros</button>
            </form>
{/* Results Section */}
            {results && (
                <div className="results">
                    <h3>Your Results</h3>
                    
                    {/* Energy Breakdown Section */}
                    <div style={{marginBottom: '20px', padding: '15px', background: '#f8fafc', borderRadius: '4px'}}>
                        <h4 style={{marginTop: 0, marginBottom: '10px'}}>Energy Breakdown</h4>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                            <div className="macro-result">
                                <span>Base Metabolic Rate (BMR):</span>
                                <span>{results.energyData.bmr} calories</span>
                            </div>
                            <div className="macro-result">
                                <span>Activity Calories:</span>
                                <span>+{results.energyData.activityCalories} calories</span>
                            </div>
                            <div className="macro-result" style={{fontWeight: 'bold'}}>
                                <span>Total Daily Energy Expenditure:</span>
                                <span>{results.energyData.tdee} calories</span>
                            </div>
                            <div className="macro-result" style={{
                                color: results.energyData.calorieAdjustment === 0 ? '#2c3e50' :
                                      results.energyData.calorieAdjustment < 0 ? '#e53e3e' : '#2f855a'
                            }}>
                                <span>Goal Adjustment:</span>
                                <span>{results.energyData.calorieAdjustment > 0 ? '+' : ''}{results.energyData.calorieAdjustment}%</span>
                            </div>
                            <div className="macro-result" style={{fontWeight: 'bold', fontSize: '18px'}}>
                                <span>Target Daily Calories:</span>
                                <span>{results.calories} calories</span>
                            </div>
                        </div>
                    </div>

                    {/* Macronutrient Breakdown */}
                    <div>
                        <h4 style={{marginBottom: '10px'}}>Macronutrient Targets</h4>
                        <div className="macro-result">
                            <span>Protein:</span>
                            <span>{results.protein}g</span>
                        </div>
                        <div className="macro-result">
                            <span>Carbs:</span>
                            <span>{results.carbs}g</span>
                        </div>
                        <div className="macro-result">
                            <span>Fat:</span>
                            <span>{results.fat}g</span>
                        </div>
                    </div>

                    {/* Customization Section */}
                    <button 
                        className="button"
                        onClick={() => setShowCustomize(!showCustomize)}
                        style={{marginTop: '20px'}}
                    >
                        {showCustomize ? 'Hide Customization' : 'Customize Macros'}
                    </button>

                    {showCustomize && (
                        <div style={{marginTop: '20px'}}>
                            <div className="form-group">
                                <label>Protein (g/lb of lean mass)</label>
                                <input 
                                    type="number"
                                    className="input-field"
                                    value={proteinMultiplier}
                                    onChange={(e) => setProteinMultiplier(parseFloat(e.target.value) || 0)}
                                    min="0"
                                    step="0.1"
                                />
                                <div style={{marginTop: '5px', fontSize: '14px', color: '#666'}}>
                                    Your lean mass: {Math.round(leanMass)} lbs
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Daily Carbs (g)</label>
                                <input 
                                    type="number"
                                    className="input-field"
                                    value={customCarbs}
                                    onChange={(e) => setCustomCarbs(parseInt(e.target.value) || 0)}
                                    min="0"
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// Render the component
ReactDOM.render(<Calculator />, document.getElementById('macro-calculator'));
