import axios from "axios";

export function postData(data, url){
    axios.post(url, {body: data})
        .then(() => {
            csv_upload_successful();
        })
        .catch(() => {
            csv_upload_failed();
        });
}

const csv_upload_successful = () => {
}

const csv_upload_failed = () => {
}
