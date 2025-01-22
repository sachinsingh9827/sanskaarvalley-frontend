import React, { useState, useEffect } from "react";

const TeacherTermsAndConditions = () => {
  const [language, setLanguage] = useState("en"); // Default language is English
  const [content, setContent] = useState(null); // State to store terms and conditions content
  const [loading, setLoading] = useState(false);

  const contentInEnglish = {
    attendanceMarking: {
      heading: "Attendance Marking",
      description:
        "Teachers are required to mark attendance for all students at the start of each class. Only today's attendance can be submitted. Ensure accuracy while marking, as it reflects the students' participation.",
    },
    editingAttendance: {
      heading: "Editing Attendance",
      description:
        "Attendance for today can be edited before the end of the day. After that, it will be locked. Please double-check attendance before submitting to avoid errors.",
    },
    grading: {
      heading: "Grading",
      description:
        "Teachers are responsible for grading student assignments, projects, and exams. All grades should be submitted promptly and accurately. Grade adjustments can be made until the grading deadline.",
    },
    studentPrivacy: {
      heading: "Student Privacy",
      description:
        "Teachers must ensure the confidentiality of student information. Personal student data, grades, and attendance records should not be shared with unauthorized parties. Follow the institution's data protection policies.",
    },
    classroomBehavior: {
      heading: "Classroom Behavior",
      description:
        "Teachers are expected to maintain a positive and respectful classroom environment. Any form of bullying, harassment, or disruptive behavior should be immediately addressed. Teachers should encourage open communication and student engagement.",
    },
    lessonPlanning: {
      heading: "Lesson Planning",
      description:
        "Teachers are required to prepare and submit lesson plans at least one week in advance. These plans should align with the curriculum and provide a clear outline of objectives, teaching methods, and assessment strategies.",
    },
    extraCurricularActivities: {
      heading: "Extra-Curricular Activities",
      description:
        "Teachers are encouraged to engage in extracurricular activities, such as clubs, sports, and student mentorship. Active participation is essential for fostering a well-rounded student experience.",
    },
    professionalDevelopment: {
      heading: "Professional Development",
      description:
        "Teachers should actively participate in professional development opportunities, including workshops, seminars, and training sessions. Continuous learning helps improve teaching techniques and keeps educators updated with the latest trends.",
    },
    leavePolicy: {
      heading: "Leave Policy",
      description:
        "Teachers are entitled to a set number of leave days each academic year. Any leave requests must be submitted at least two weeks in advance, except in cases of emergency. Unauthorized absences may lead to disciplinary action.",
    },
    communicationWithParents: {
      heading: "Communication with Parents",
      description:
        "Teachers should maintain regular communication with parents or guardians regarding student progress, behavior, and any concerns. Parent-teacher meetings should be held periodically, and emails or phone calls should be responded to promptly.",
    },
    codeOfConduct: {
      heading: "Code of Conduct",
      description:
        "Teachers must adhere to the institution's code of conduct at all times, both within and outside the classroom. This includes maintaining professionalism, respect, and ethical behavior towards students, colleagues, and staff.",
    },
    emergencyProtocol: {
      heading: "Emergency Protocol",
      description:
        "Teachers are responsible for ensuring the safety of students during emergencies, such as fire drills or other crises. All teachers must familiarize themselves with the emergency procedures and evacuation routes.",
    },
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    if (selectedLanguage !== "en") {
      translateContent(contentInEnglish, selectedLanguage);
    } else {
      setContent(contentInEnglish); // Set English content when English is selected
    }
  };

  const translateContent = async (content, targetLang) => {
    setLoading(true); // Start loading
    const translatedContent = {};

    for (const [key, value] of Object.entries(content)) {
      if (typeof value === "object") {
        translatedContent[key] = {
          heading: await translateText(value.heading, targetLang),
          description: await translateText(value.description, targetLang),
        };
      } else {
        translatedContent[key] = await translateText(value, targetLang);
      }
    }

    setContent(translatedContent);
    setLoading(false); // Stop loading
  };

  const translateText = async (text, targetLang) => {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
      text
    )}`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Translation API failed");
      }
      const data = await res.json();
      return data[0][0][0];
    } catch (error) {
      console.error("Error during translation:", error);
      return text; // Return original text if there was an error
    }
  };

  useEffect(() => {
    setContent(contentInEnglish); // Set default content to English
  }, []);

  return (
    <div className="container mx-auto p-6 font-montserrat">
      <div className="flex flex-col sm:flex-row justify-between p-2 border-b-2 border-[#105183]">
        <h1 className="text-2xl text-center sm:text-left text-[#105183] mb-2  sm:mb-0">
          Terms and Conditions
        </h1>
        <div className="flex justify-end ">
          <select
            className="text-lg border border-indigo-500 rounded-full p-2 hover:bg-indigo-500 hover:text-white"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8">
        {content ? content.title : "Loading..."}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-100">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#105183]"></div>
        </div>
      ) : content && Object.keys(content).length > 0 ? (
        Object.keys(content).map((key) => {
          if (content[key]?.heading && content[key]?.description) {
            return (
              <div
                key={key}
                className="bg-gray-100 p-4 rounded-lg shadow-md mb-6"
              >
                <h2 className="text-2xl font-semibold mb-4 text-[#105183]">
                  {content[key]?.heading}
                </h2>
                <p className="text-lg mb-2 text-gray-600">
                  {content[key]?.description}
                </p>
              </div>
            );
          }
          return null;
        })
      ) : (
        <p>No content available</p>
      )}
    </div>
  );
};

export default TeacherTermsAndConditions;
