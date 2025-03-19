export interface SaveLocationInterface {
  success?: boolean;
  saveLocationData?: SaveLocationDataInterface;
  saveLocationDataUpdate?: SaveLocationUpdateInterface;
  saveLocationDataGet?: SaveLocationGetInterface;
  loading?: boolean;
}

export interface SaveLocationDataInterface {
  title?: string;
  location?: string;
  type?: string;
}

export interface SaveLocationUpdateInterface {}

export interface SaveLocationGetInterface {}
