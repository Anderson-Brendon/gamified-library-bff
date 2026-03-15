'use client'

import { ChangeEvent, useRef, useState} from 'react';

//faz solicitacao para a API do nextjs que solicita uma url presigned para API do spring
async function getPresignedUrl(){
    try {
        const response: Response = 
        await fetch("http://localhost:3000/api/presigned-url/profile-picture")

        const responseBody = await response.json();

        return responseBody.presignedUrl;

    } catch (error) {
        console.log(error)
    }
}

function isFileAboveThisSize(sizeInMegabytes : number, size: number){
    return size > sizeInMegabytes * 1024 * 1024
}

async function putProfilePicture(file: File | undefined, presignedUrl: string){
    try {
        const response: Response = await fetch(presignedUrl, {
            method: "PUT",
            body: file
        })

        return response.ok;

    } catch (error) {
        console.log(error)
    }
}

export function ProfilePictureUploader({profilePictureUrl} : {profilePictureUrl:string}) {

    //gambiarra pra forçar o recarregamento da url
    let reload = useRef(0).current;
 
    const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {

        const url = await getPresignedUrl();

        const input : HTMLInputElement = event.target;

        const file = input.files?.[0];
        
        await putProfilePicture(file, url);

        reload++;
    };

    return (
        <div>
            <img className={"w-50"} src={`${profilePictureUrl}?v=${reload}`} />
            <label htmlFor="File" className="block rounded border border-gray-300 p-4 text-gray-900 shadow-sm sm:p-6">
            <div className="flex items-center justify-center gap-4">
                <span className="font-medium"> Upload a picture</span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"></path>
                </svg>
            </div>

            <input accept="image/*" onChange={(e) => {handleFileUpload(e)}} type={"file"} id="File" className="sr-only"/>
        </label></div>
    )
}