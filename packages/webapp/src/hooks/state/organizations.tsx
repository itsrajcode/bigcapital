// @ts-nocheck
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOrganizations } from '@/store/organizations/organizations.actions';
import { getCurrentOrganizationFactory } from '@/store/authentication/authentication.selectors';

export const useSetOrganizations = () => {
  const dispatch = useDispatch();

  return useCallback((organizations) => {
    dispatch(setOrganizations(organizations))    
  }, [dispatch]);
};

export const useCurrentOrganization = () => {
  return useSelector(getCurrentOrganizationFactory())
};

/**
 * Hook to get the organization's base currency code
 * @returns {string} The organization's base currency or 'USD' as default
 */
export const useOrganizationBaseCurrency = () => {
  const organization = useCurrentOrganization();
  return organization?.base_currency || 'USD';
};