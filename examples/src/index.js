import ImageLoader from "../../src/loader/image.loader";
import VideoLoader from "../../src/loader/video.loader";

import URLUtil from "../../src/utils/url.util";
import MD5Util from "../../src/utils/md5.util";

window.onImageFileChange = async (e) => {
    const md5 = await MD5Util.getFileMD5(e.files[0]);
    console.log('md5', md5);
    const loader = new ImageLoader(e.files[0]);
    const imageInfo = await loader.load();
    console.log(imageInfo);
    if (imageInfo) {
        const data = URLUtil.createObjectURL(e.files[0]);
        const imageElement = document.createElement("img");
        imageElement.src = data;
        imageElement.width = imageInfo.width;
        imageElement.height = imageInfo.height;
        imageElement.onload = () => {
            URLUtil.revokeObjectURL(data);
        };
        document.body.append(imageElement);
    }
};

window.onVideoFileChange = async (e) => {
    const md5 = await MD5Util.getFileMD5(e.files[0]);
    console.log('md5', md5);
    const loader = new VideoLoader(e.files[0]);
    const videoInfo = await loader.load();
    console.log(videoInfo);
    if (videoInfo) {
        const data = URLUtil.createObjectURL(e.files[0]);
        const videoElement = document.createElement("video");
        videoElement.src = data;
        videoElement.controls = "controls";
        videoElement.width = videoInfo.width;
        videoElement.height = videoInfo.height;
        videoElement.onclick = () => {
            URLUtil.revokeObjectURL(data);
            videoElement.remove();
        };
        document.body.append(videoElement);
    }
};