export interface FormData {
    inputLabel: string;
    controlName: string;
    controlType: string;
    valueType?: string;
    currentValue?: string;
    placeholder?: string;
    isCountDown?: boolean;
    psValue?: string;
    options?: Array<{
      optionName: string;
      value: string;
     }>;
    validators?: {
      required?: boolean;
      minlength?: number;
      maxlength?: number;
    };
  }