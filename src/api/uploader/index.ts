import request from "@/utils/request";

enum API {
    UPLOAD_URL = '/api/upload',
    GETFILESINFO_URL = '/api/files/',
    GETUSERINFO_URL = '/api/getAcluUserInfo',
    USERLOGIN_URL = '/admin/userLogin'
}

export const reqUpload = (data:any)=>request.post<any,any>(API.UPLOAD_URL,data);
export const getFilesInfo = (name:any)=>request.get<any,any>(API.GETFILESINFO_URL+name)
export const getUserInfo = ()=>request.get<any,any>(API.GETUSERINFO_URL)
export const reqLogin1 = (data:any)=>request.post<any,any>(API.USERLOGIN_URL,data)


