// function vala hissa
async function generateResult() {
  const gender = document.getElementById("geninput").value;
  const occu = document.getElementById("occupinput").value;
  const age = document.getElementById("ageinput").value;
  const wt = document.getElementById("wtinput").value;
  const ht = document.getElementById("htinput").value;
  const sleep = document.getElementById("sleepinput").value;
  const diet = document.getElementById("dietinput").value;
  const extra = document.getElementById("extrainput").value;
  const goal = document.getElementById("goalinput").value;



  const prompt = `I am a ${diet} ${gender} working as a ${occu}, aged ${age} years, weighing ${wt} kg and ${ht} cm tall.
I sleep ${sleep} hours per day, and I am unable to change my sleep schedule.
My primary fitness goal is ${goal}, and I also have the following personal issues or limitations: ${extra}.

Based on this information, generate ONLY a Workout Plan and a Diet Plan to help me achieve my body goal.

The response MUST be presented strictly in the following tabular format:

_________________________________________________________________________________________
| Calculations and Assumptions:                                                          |
| - Include BMR, TDEE, and any other relevant calculations with brief explanations.     |
|________________________________________________________________________________________|
| Daily Caloric Needs:                                                                  |
| - Clearly state calculated daily calorie intake based on TDEE and body goals.        |
|________________________________________________________________________________________|
| Meal Plan:                                                                            |
| - Provide a structured daily meal plan aligned with my diet type and calorie needs. |
|________________________________________________________________________________________|
| Workout Plan:                                                                         |
| - Provide a weekly workout schedule tailored to my goal and limitations.            |
|________________________________________________________________________________________|
| Additional Tips:                                                                      |
| - Include practical tips related to recovery, hydration, consistency, and safety.   |
|________________________________________________________________________________________|
    `;


  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "⏳ Generating Result...";

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // key yaha dalna
        "Authorization": "Bearer (api_key)"
      },
      body: JSON.stringify({
        //Use a valid model name
        model: "model_name",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    if (data.choices && data.choices[0]) {
      const rawResult = data.choices[0].message.content;
      outputDiv.innerHTML = rawResult.replace(/\n/g, "<br>");
    } 
    else {
      outputDiv.innerHTML = "❌ Error: " + (data.error ? data.error.message : "Invalid response");
    }} 

  
  catch (error) {
    outputDiv.innerHTML = "❌ Network Error: " + error.message;
  }
}

// main code -------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".generate-button").addEventListener("click", generateResult);
});


