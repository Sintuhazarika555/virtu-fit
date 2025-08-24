
async function generateResult() {
  const gender = document.getElementById("geninput").value;
  const occu = document.getElementById("occupinput").value;
  const age = document.getElementById("ageinput").value;
  const wt = document.getElementById("wtinput").value;
  const ht = document.getElementById("htinput").value;
  const sleep = document.getElementById("sleepinput").value;
  const goal = document.getElementById("goalinput").value;

  const prompt = `I am a ${gender} ${occu}, with age of ${age} years, weight of ${wt} kg 
    and height of ${ht} cm. I sleep for ${sleep} hours daily and I can't change my sleep cycle.
    My body goal is ${goal}. Generate only workout plan and Diet plan for me to achieve my body goals. give data in below format:
    Calculations and Assumptions: (include BMR, TDEE, and any other relevant calculations.)
    Daily Caloric Needs: (calculated daily caloric needs based on TDEE and body goals.)
    Meal plan: (genrated meal plan.)
    Workout plan: (generated workout plan.)
    Additional Tips: (generated tips.)`;

  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "⏳ Generating Result...";

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY_HERE" // ⚠️ Replace with your key
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    // Raw response
    const rawResult = data.choices[0].message.content;


    // format: line breaks 
    const formattedResult = rawResult
      .replace(/\n/g, "<br>")

    outputDiv.innerHTML = formattedResult;


  } catch (error) {
    outputDiv.innerHTML = "❌ Error: " + error.message;
  }
}

// Attach to button click
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".generate-button").addEventListener("click", generateResult);
});

