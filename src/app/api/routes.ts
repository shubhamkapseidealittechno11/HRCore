const userBaseUrl: any = `${process.env.NEXT_PUBLIC_USER_API}`;
const contentBaseApi: any = `${process.env.NEXT_PUBLIC_CONTENT_API}`;
const awsHostBaseApi: any = `${process.env.NEXT_PUBLIC_AWS_HOST}`;
const baseId: any = `${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}`;
const tableName: any = `${process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME}`;
const viewName: any = `${process.env.NEXT_PUBLIC_AIRTABLE_VIEW_NAME}`;


const routes = {

  LOGIN:() => `${userBaseUrl}/auth/login`,
  REGISTER:() => `${userBaseUrl}/auth/signup`,
  ADMIN_PROFILE: () => `${userBaseUrl}profile`,
  UPDATE_PROFILE:(id:any) => `${userBaseUrl}update-profile`,
  CHANGE_PASSWORD: () => `${userBaseUrl}changePassword`,
  DASHBOARD_LIST:() => `${userBaseUrl}/results/`,
  FORGOT_PASSWORD:() => `${userBaseUrl}forgotPassword`,
  OTP_VERIFY:() => `${userBaseUrl}forgotPassword/verify`,
  RESET_PASSWORD:() => `${userBaseUrl}resetPassword`,
  RESEND_OTP:() => `${userBaseUrl}forgotPassword/resendOtp`,
  GET_CONTENT:(id:any)=>`${contentBaseApi}content_pages/${id}.json`,
  AIRTABLE_URL:()=>`https://api.airtable.com/v0/${baseId}/${tableName}?view=${viewName}`,
  JOB_LIST:(params :any)=>`${userBaseUrl}/jobs/?page=${params.page}&limit=${params.limit}`,
  CREATE_JOB:()=>`${userBaseUrl}/jobs/`,
  DELETE_JOB:(id:any)=>`${userBaseUrl}/jobs/${id}`,
  CANDIDATE_LIST:(params :any)=>`${userBaseUrl}/resumes/my-candidates?page=${params.page}&limit=${params.limit}`,
  };


export default routes;
