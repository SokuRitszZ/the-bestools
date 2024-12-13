export interface Language {
  id: string;
  name: string;
}

export interface Code {
  id: string;
  name: string;
  language?: string;
  text: string; 
}

export interface CodePicProps {
  key?: string;
}