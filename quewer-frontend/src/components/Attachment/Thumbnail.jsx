import pdfImg from '../../assets/pdf.png';
import zipImg from '../../assets/zip.png';

export default function Thumbnail(file){
    if (file.type.match('image/*')){
        return URL.createObjectURL(file);
    }
    else if (file.type === 'application/pdf'){
        return pdfImg;
    }
    else if (file.type === 'application/zip'){
        return zipImg;
    }
}