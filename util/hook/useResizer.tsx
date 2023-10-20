import Resizer from "react-image-file-resizer";

export const useResizer = async function (imageFile: Blob, maxFileSize: number, decrementRatio: number) {
    try {
        console.log("resize 実行中");
        
        let file = imageFile;

        // 画像サイズを取得するためにimageをインスタンス化
        let img = new Image();
        const image_path = URL.createObjectURL(file);
        img.src = image_path;
        
        const loadedImage = await new Promise<HTMLImageElement>((resolve, reject) => {
            img.onload = () => {
                resolve(img);
            };
            img.onerror = (error) => {
                reject(error);
            };
        });
        //幅と高さの長い方を最大サイズに指定するために取得する
        const width = loadedImage.width;
        const height = loadedImage.height;
        let maxLength = width > height ? width : height
        
        // 最大ループ数を5とする。それ以降はエラーを出し、保存できないようにする
        const maxAttempt = 5;
        let attempts = 0;

        // ループで最大サイズ以下になるようにする。随時最大画像サイズを小さくしていく
        while (attempts < maxAttempt && file.size > maxFileSize) {
            maxLength = attempts!=0 ? Math.round(maxLength - (decrementRatio * maxLength)) : maxLength
            const res = await resizeFile(file, maxLength)
            console.log(res)
            file = res
            attempts++;
        }
        if (file.size <= maxFileSize) {
            console.log("resizeが完了しました。");
            return file
        }
        else throw new Error("画像サイズが大きいため保存に失敗しました。")
    } catch (error) { throw error }
}

const resizeFile = (file: Blob, maxLength: number): Promise<Blob> => {
    return new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            maxLength,
            maxLength,
            'webp',
            20,
            0,
            (uri) => {
                if (uri instanceof Blob || uri instanceof File) {
                    resolve(uri)
                }
            },
            'file'
        )
    })
}