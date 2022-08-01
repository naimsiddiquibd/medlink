
export const QUERY_LISTPROFILES = {
    query: `query MyQuery {
        getProfile {
            name 
            city
            exp
            phone
            salary
            salaryThousands    
            specialization
            activelySearching
        }
    }`
};

export const QUERY_GETSKILLSLIST = {
    query: `query MyQuery {
        getSkillsList  {          
            name
        }
    }`
};

export const QUERY_GETEDUCATIONLIST = {
    query: `query MyQuery {
        getEducationList   {          
            courseName
        }
    }`
};

export const QUERY_GETEXPERIENCE = {
    query: `query MyQuery {
        getExperienceList    {          
            hospital
        }
    }`
};
export const QUERY_GETMEMBERSHIPS = {
    query: `query MyQuery {
        getMemberships     {          
            organization
        }
    }`
};

export const QUERY_GETPERSONALDETAILS = {
    query: `query MyQuery {
        getPersonalDetails     {          
            gender
        }
    }`
};

export const QUERY_GETCAREERPROFILEPERCENTAGE = {
    query: `query MyQuery {
        getCareerProfile     {          
            departmentName
        }
    }`
};

export const QUERY_COURSEID = {
    query: `query MyQuery {
        getCourseMaster {
            cmID
            name
        }
    }`
};

export const QUERY_SPECIALIZATIONID = {
    query: `query MyQuery {
        getSpecializationMaster  {
            name
            smID
        }
    }`
};

export const QUERY_UNIVERSITYID = {
    query: `query MyQuery {
        getUniversityMaster   {
            name 
            umID
        }
    }`
};

export const QUERY_GETEDUCATION = {
    query: `query MyQuery {
        getEducationList {
            courseID
            courseName
            courseType
            eduID
            specialization
            specializationID
            title
            university
            universityID
            yearOfPassing
        }
    }`
};
export const QUERY_LISTSKILLS = {
    query: `query MyQuery {
      getSkillMaster {
          name
          skillID
        }
      }
    `
}

export const QUERY_SAVED_SKILL = {
    query: `query MyQuery {
        getSkillsList {
            sID
            name
            skillID
           }
        }`
};

export const QUERY_DESIGNMASTER = {
    query: `query MyQuery {
        getDesignationMaster {
            dmID 
            name
        }
    }`
};

export const QUERY_HOSPITALMASTER = {
    query: `query MyQuery {
        getHospitalMaster {
            hmID 
            name
        }
    }`
};

export const QUERY_NOTICEMASTER = {
    query: `query MyQuery {
        getNoticePeriodMasters {
            npID 
            notice
        }
    }`
};

export const QUERY_GETEXPERIENCELIST = {
    query: `query MyQuery {
        getExperienceList {
            currentlyWorking
            description
            designation
            designationID
            employmentType
            expID
            hospital
            hospitalID
            jobType
            noticePeriodID
            startingYear
            startingMonth
            workingMonth
            workingYear
            notice
        }
    }`
};

export const QUERY_GETMEMBERSHIP = {
    query: `query MyQuery {
         getMemberships {
            lifeMembership
            memID
            organization
            positionHeld
        }
    }`
};

export const QUERY_GETPAPERS = {
    query: `query MyQuery {
         getPapers {
            description
            fileURL
            month
            paperID
            title
            url
            year 
        }
    }`
};

export const QUERY_GETAWARDS = {
    query: `query MyQuery {
         getAwards {
            awardID
            description
            month
            name
            url
            year             
        }
    }`
};

export const QUERY_PERSONAL_DETAILS = {
    query: `query MyQuery {
        getPersonalDetails {
            address
            dateofBirth
            differentlyAbled
            gender
            homeTown
            pdID
            maritalStatus
            }
        }`
};

export const QUERY_LANGUAGES_KNOWN = {
    query: `query MyQuery {
        getLanguagesKnown {
            language
            lknID
            proficiency
            read
            speak
            write
            }
        }`
}

export const QUERY_SAVEDJOBS = {
    query: `query MyQuery {
        getSavedJobs {
                    description
                    employmentType
                    experience
                    jobTitle
                    lastDateToApply
                    location
                    maximumSalary
                    minimumSalary
                    postedOn
                    primarySpecialization
                    qualification
                    secondarySpecialization
                    vacancyID
                    vacancyType
                }
                }`
};
export const QUERY_DEPARTMENTS = {
    query: `query MyQuery {
        getDepartments {
            departmentID
            name
            }
    }`
};

export const QUERY_GETCAREERPROFILE = {
    query: `query MyQuery {
        getCareerProfile {
            cpID
            departmentID
            departmentName
            desiredEmploymentType
            desiredJobType
            desiredShift
            expectedSalaryEnd
            expectedSalaryStart
            industry
            jobRole
            roleCategory
            preferredWorkLocation
        }
    }`
};

export const QUERY_GETCANDIDATEAVAILABILITY = {
    query: `query MyQuery {
        getCandidateAvailability {
            availID
            day
            fromTime
            toTime
        }
    }`
};

export const QUERY_GETHOSPITAL = {
    query: `query MyQuery {
         getHospital {
            contactEmail
            contactName
            contactPhone
            hospitalID
            location
            name 
            shortName
            taxNumber
            type             
        }
    }`
};

export const QUERY_SINGLEJOBDETAIL = {
    query: `query MyQuery {
        searchTop4Jobs {
            description
            employmentType
            experience
            jobTitle
            lastDateToApply
            location
            maximumSalary
            minimumSalary
            postedOn
            primarySpecialization
            qualification
            vacancyID
            secondarySpecialization
            vacancyType           
        }
    }`
};


export const gqlquery = (query, variables) => {
    const access_token = sessionStorage.getItem("accessToken");
    const gquery = {
        query: query.query,
        variables: variables
    }
    return fetch(
        "https://bjhhgfrecbfd7biv7zbf7vb77i.appsync-api.ap-south-1.amazonaws.com/graphql",
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authority:
                    "bjhhgfrecbfd7biv7zbf7vb77i.appsync-api.ap-south-1.amazonaws.com",
                authorization: access_token,
                referer: "https://ap-south-1.console.aws.amazon.com/",
                "accept-language": "en-US,en;q=0.9",
            },
            body: JSON.stringify(gquery),
        }
    )
}
