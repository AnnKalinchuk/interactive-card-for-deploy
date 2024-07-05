const getShortenedName = (name, maxLength) => {
  const parts = name.split(" ");

  if (parts.length >= 2) {
    const firstName = parts[0];
    const lastName = parts[1];

    if (firstName.length + lastName.length > maxLength) {
      const lastNameInitial = lastName.charAt(0);
      return `${firstName} ${lastNameInitial}.`;
    }

    return `${firstName} ${lastName}`;
  }

  return name;
};

export default getShortenedName;
