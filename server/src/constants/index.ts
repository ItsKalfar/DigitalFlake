export const UserRolesEnum = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export const AvailableUserRoles = Object.values(UserRolesEnum);

export const CategoryStatusEnum = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
};

export const CategoryStatus = Object.values(CategoryStatusEnum);

export const ProductStatusEnum = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
};

export const ProductStatus = Object.values(ProductStatusEnum);

export const USER_TEMPORARY_TOKEN_EXPIRY = 20 * 60 * 1000;
