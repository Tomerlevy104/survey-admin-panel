const BASE_URL = process.env.REACT_APP_API_BASE_URL;

///////////////////////////////////////////////////////////////////////
// Get all survey for a user
export async function fetchSurveys(jwt) {
  const res = await fetch(`${BASE_URL}/api/admin/surveys`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Fetching surveys failed");
  }

  return res.json();
}

///////////////////////////////////////////////////////////////////////
// Create a new survey
export async function createSurvey(jwt, surveyData) {
  const res = await fetch(`${BASE_URL}/api/admin/surveys`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(surveyData),
  });
  if (!res.ok) {
    throw new Error("Creating survey failed");
  }
  return res.json();
}
///////////////////////////////////////////////////////////////////////
// Delete a survey
export async function deleteSurvey(jwt, surveyId) {
  const res = await fetch(`${BASE_URL}/api/admin/surveys/${surveyId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  if (!res.ok) {
    throw new Error("Deleting survey failed");
  }
  return true;
}
///////////////////////////////////////////////////////////////////////
// Update a survey
export async function updateSurvey(jwt, surveyId, surveyData) {
  const res = await fetch(`${BASE_URL}/api/admin/surveys/${surveyId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(surveyData),
  });
  if (!res.ok) {
    throw new Error("Updating survey failed");
  }
  return res.json();
}
///////////////////////////////////////////////////////////////////////
// Get a single survey by ID
export async function fetchSurveyById(jwt, surveyId) {
  const res = await fetch(`${BASE_URL}/api/admin/surveys/${surveyId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Fetching survey failed");
  }
  return res.json();
}
///////////////////////////////////////////////////////////////////////
// Get all responses for a survey
export async function fetchSurveyResponses(jwt, surveyId) {
  const res = await fetch(
    `${BASE_URL}/api/admin/surveys/${surveyId}/responses`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/json",
      },
    },
  );
  if (!res.ok) {
    throw new Error("Fetching survey responses failed");
  }
  return res.json();
}

///////////////////////////////////////////////////////////////////////
