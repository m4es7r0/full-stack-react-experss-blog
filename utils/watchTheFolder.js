import fs from "fs";
import path from "path";
import getFolderSize from 'get-folder-size';

const watchTheFolder = async (directory, sizeValue) => {
  const size = await getFolderSize.loose(directory)

  if ((size / 1000 / 1000).toFixed(2) > sizeValue) {
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
    
      for (const file of files) {
        fs.unlink(path.join(directory, file), (err) => {
          if (err) throw err;
        });
      }
    });
  }

}

export default watchTheFolder