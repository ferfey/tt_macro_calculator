# Macro Calculator Email Integration

## Squarespace Setup
1. Create Mailing List
   - Name: "Macro Calculator Subscribers"
   - Custom Fields:
     - Height
     - Weight
     - Body Fat %
     - Activity Level
     - Goal
     - Calculated Macros

## Integration Details
```javascript
// Form submission data structure
{
  'form-name': 'macro-calculator-signup',
  'email': userEmail,
  'calculatorResults': {
    profile: {
      height: data.height,
      weight: data.weight,
      bodyFat: data.bodyFat,
      leanMass: Math.round(leanMass),
      activity: data.activity,
      goal: data.goal
    },
    targets: {
      calories: results.calories,
      protein: results.protein,
      carbs: results.carbs,
      fat: results.fat
    }
  }
}
```

## Email Template HTML
<!-- Base template structure to be customized -->
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
<header style="background: #2c3e50; padding: 20px; color: white; text-align: center;">
<h1 style="margin: 0; font-size: 24px;">Your Transform Training Nutrition Plan</h1>
</header>
<main style="padding: 20px;">
<section style="margin-bottom: 30px; background: #f8fafc; padding: 15px; border-radius: 4px;">
<h2 style="color: #2c3e50; margin-bottom: 15px;">Your Profile</h2>
<ul style="list-style: none; padding: 0; margin: 0;">
<li style="margin-bottom: 8px;">Height: {{height}} inches</li>
<li style="margin-bottom: 8px;">Weight: {{weight}} lbs</li>
<li style="margin-bottom: 8px;">Body Fat: {{bodyFat}}%</li>
<li style="margin-bottom: 8px;">Lean Body Mass: {{leanMass}} lbs</li>
<li style="margin-bottom: 8px;">Activity Level: {{activity}}</li>
<li style="margin-bottom: 8px;">Goal: {{goal}}</li>
</ul>
</section>
<section style="margin-bottom: 30px; background: #f8fafc; padding: 15px; border-radius: 4px;">
<h2 style="color: #2c3e50; margin-bottom: 15px;">Daily Targets</h2>
<div style="margin-bottom: 15px;">
<p style="font-size: 18px; margin: 5px 0;">Calories: {{calories}} kcal</p>
<p style="font-size: 18px; margin: 5px 0;">Protein: {{protein}}g</p>
<p style="font-size: 18px; margin: 5px 0;">Carbs: {{carbs}}g</p>
<p style="font-size: 18px; margin: 5px 0;">Fat: {{fat}}g</p>
</div>
</section>
<section style="margin-bottom: 30px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
<h2 style="color: #2c3e50; margin-bottom: 15px;">Next Steps</h2>
<p>While these calculations provide a scientific starting point, achieving your fitness goals requires proper implementation and adjustments. Transform Training offers:</p>
<ul style="padding-left: 20px;">
<li style="margin-bottom: 8px;">Personalized nutrition coaching</li>
<li style="margin-bottom: 8px;">Custom meal planning</li>
<li style="margin-bottom: 8px;">Progress tracking and adjustments</li>
<li style="margin-bottom: 8px;">1-on-1 training programs</li>
<li style="margin-bottom: 8px;">Ongoing support and accountability</li>
</ul>
</section>
</main>
<footer style="background: #f8fafc; padding: 20px; text-align: center; border-radius: 4px;">
<p style="margin-bottom: 10px;"><strong>Ready to transform your body and health?</strong></p>
<p style="margin-bottom: 5px;">Contact us to schedule a consultation:</p>
<p style="margin: 0;">
<strong>Email:</strong> info@transformtraining.com<br>
<strong>Phone:</strong> (555) 123-4567<br>
<strong>Website:</strong> www.transformtraining.com
</p>
</footer>
</div>

## To Do
- [ ] Finalize email template design
- [ ] Set up Squarespace mailing list
- [ ] Create welcome email automation
- [ ] Test form submission
- [ ] Test email delivery
- [ ] Add tracking parameters
- [ ] Create A/B test variants

## Notes
- Need to confirm Transform Training brand colors
- Need final copy for call-to-action sections
- Need to decide on email frequency for follow-up sequence
