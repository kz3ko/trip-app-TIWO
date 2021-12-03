// eslint-disable-next-line import/prefer-default-export
export const requireParams = <T extends Record<string, any>>(
  body: T, ...requiredParams: (keyof T)[]
): Record<keyof T, string> | null => {
  let errors = 0;
  const errorObject: Record<keyof T, string> = {} as Record<keyof T, string>;
  requiredParams.forEach((param) => {
    if (!body[param]) {
      errorObject[param] = 'This field is required';
      errors += 1;
    }
  });

  return errors ? errorObject : null;
};

export const pickParams = <T extends Record<string, any>>(
  body: T, ...params: (keyof T)[]
): Partial<T> => {
  const picked: Partial<T> = {};

  params.forEach((param) => {
    picked[param] = body[param];
  });

  return picked;
};
