import { SetMetadata } from '@nestjs/common';

/**
 * This is a custom decorator
 * Are role is simple : set & distribute metadata to the pipe for the 'roles' tag
 * @param {array} roles the list of role
 * @return {any} return SetMetadata
 */
export const Roles = (...roles: string[]): any => SetMetadata('roles', roles);
