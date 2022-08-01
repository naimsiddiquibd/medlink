
export const QUERY_GETHOSPITALUSERS = {
    query: `query MyQuery {
         getHospitalUsers {
            email
            huID
            accessJobPosting
            accessResumeDB        
            name
            status    
        }
    }`
};

export const QUERY_GETMYPROFILE = {
    query: `query MyQuery {
        getMyProfile  {
            accessJobPosting   
            adminUser      
        }
    }`
};


export const QUERY_GETJOBPOSTINGPLANS = {
    query: `query MyQuery {
        getJobPostPlans {
            features
            name
            price
            recommended
            spID
            subtext
            validity
            terms
            }       
    }`
}; 

 
export const QUERY_GETRESUMEDBPLANS = {
    query: `query MyQuery {
        getResumeDBPlans {
            features
            name
            price
            recommended
            spID
            subtext
            validity
            terms
            }
    }`
}; 


export const QUERY_GETHOSPITAL = {
    query: `query MyQuery {
        getHospital {
            contactEmail
            contactName
            contactPhone
            description
            googlePlaceID
            hospitalID
            latitude
            longitude
            name
            taxNumber
            type   
        }
    }`
};

export const QUERY_VACANCIES = {
    query: `query MyQuery {
        getVacancies {
            jobTitle
            vacancyType
            postedOn
            responses
            vacancyID
        }
    }`
};

export const QUERY_GETHRFOLDER = {
    query: `query MyQuery {
        getFolders {
            folderID
            name
            profileCount
            userName
        }
        getFolderWiseProfilesCount {
            folderID
            profiles
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

export const QUERY_DEPARTMENTS = {
    query: `query MyQuery {
        getDepartments {
            departmentID
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

export const gqlquery = (query, variables) => {
    const access_token = sessionStorage.getItem("accessToken");
    const gquery = {
        query: query.query,
        variables: variables
    }
    return fetch(
        "https://wsxum73oezhchbycue2y5zorba.appsync-api.ap-south-1.amazonaws.com/graphql",
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authority:
                    "wsxum73oezhchbycue2y5zorba.appsync-api.ap-south-1.amazonaws.com",
                authorization: access_token,
                referer: "https://ap-south-1.console.aws.amazon.com/",
                "accept-language": "en-US,en;q=0.9",
            },
            body: JSON.stringify(gquery),
        }
    )
}