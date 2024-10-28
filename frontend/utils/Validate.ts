import { ZodError, ZodSchema } from "zod";

export const validate = <T extends object>(
  schema: ZodSchema,
  hasMatchingFields: boolean = false,
  matchingFields: string[] = [],
  customMessage?: any
): ((data: T) => { valid: boolean; errors: T }) => {
  return (data: T) => {
    const errorsObject = createEmptyErrorsObject(data);
    try {
      schema.parse(data);
      if (hasMatchingFields) {
        const matchingFieldsError = handleMatchingFields(data, matchingFields);
        if (matchingFieldsError) {
          if (customMessage) {
            errorsObject[matchingFieldsError.field] = customMessage[
              matchingFieldsError.field
            ]
              ? customMessage[matchingFieldsError.field]
              : matchingFieldsError.message;
          } else {
            errorsObject[matchingFieldsError.field] =
              matchingFieldsError.message;
          }
          return {
            valid: false,
            errors: errorsObject as T,
          };
        }
      }
      return {
        valid: true,
        errors: errorsObject as T,
      };
    } catch (error: any) {
      const parsedErrors = parseZodErrors(
        error.errors,
        hasMatchingFields,
        data,
        matchingFields,
        customMessage
      );
      return {
        valid: false,
        errors: parsedErrors as T,
      };
    }
  };
};

const createEmptyErrorsObject = <T extends object>(data: T) => {
  return Object.keys(data).reduce((acc, key) => {
    acc[key] = "";
    return acc;
  }, {} as Record<string, string>);
};

const handleMatchingFields = (
  data: any,
  matchingFields: string[],
  customMessage?: any
) => {
  const initialData = data[matchingFields[0]];
  for (let i = 1; i < matchingFields.length; i++) {
    if (data[matchingFields[i]] !== initialData) {
      if (customMessage) {
        return {
          field: matchingFields[i],
          message: customMessage[matchingFields[i]]
            ? customMessage[matchingFields[i]]
            : `${matchingFields[i]} does not match ${matchingFields[0]}`,
        };
      }
      return {
        field: matchingFields[i],
        message: `${matchingFields[i]} does not match ${matchingFields[0]}`,
      };
    }
  }
  return null;
};

const parseZodErrors = (
  zodErrors: ZodError[],
  hasMatchingFields: boolean,
  data: any,
  matchingFields: string[],
  customMessage?: any
) => {
  const parsedErrors = zodErrors.map((error: any) => ({
    field: error.path.join("."),
    message: error.message,
  }));

  if (hasMatchingFields) {
    const matchingFieldsError = handleMatchingFields(
      data,
      matchingFields,
      customMessage
    );
    if (matchingFieldsError) {
      parsedErrors.push(matchingFieldsError);
    }
  }

  return parsedErrors.reduce((acc, error) => {
    acc[error.field] = error.message;
    return acc;
  }, {} as Record<string, string>);
};
