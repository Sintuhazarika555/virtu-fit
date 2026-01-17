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



  const prompt = `I am a ${diet} ${gender} ${occu}, with age of ${age} years, weight of ${wt} kg 
    and height of ${ht} cm. I sleep for ${sleep} hours daily and I can't change my sleep cycle.
    My body goal is ${goal}.  and also my personal issues are ${extra}. Generate only workout plan and 
    Diet plan for me to achieve my body goals. give data in below format in tabular form.:
    _________________________________________________________________________________________
    |Calculations and Assumptions: (include BMR, TDEE, and any other relevant calculations.) |
    |________________________________________________________________________________________|
    |Daily Caloric Needs: (calculated daily caloric needs based on TDEE and body goals.)     |
    |________________________________________________________________________________________|
    |Meal plan: (genrated meal plan.)                                                        |
    |________________________________________________________________________________________|
    |Workout plan: (generated workout plan.)                                                 |
    |________________________________________________________________________________________|
    |Additional Tips: (generated tips.)                                                      |
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

