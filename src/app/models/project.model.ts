import {ProjectTypeEnum} from '../enums/project-type.enum';

export interface ProjectModel {
  name: string;
  summary: string;
  description: string;
  tags: string[];
  image: string;
  imageWidth: number;
  imageHeight: number;
  type: ProjectTypeEnum;
  featured: boolean;
  github?: string;
  ios?: string;
  android?: string;
}
