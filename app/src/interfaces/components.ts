export interface Image {
  id: string;
  file: File;
}

export interface ImagePickerItemData {
  name: string;
  files: Image[];
}

export interface ImagePickerFile {
  id: string;
  file: string;
}

export interface OptionItem {
  value: string;
  label: string;
}
