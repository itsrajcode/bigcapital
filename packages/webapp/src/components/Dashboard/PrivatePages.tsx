// @ts-nocheck
import React, { lazy } from 'react';
import { Switch, Route } from 'react-router';

import Dashboard from '@/components/Dashboard/Dashboard';
import DrawersContainer from '@/components/DrawersContainer';

import { PrivatePagesProvider } from './PrivatePagesProvider';
import EnsureOrganizationIsReady from '../Guards/EnsureOrganizationIsReady';
import { EnsureAuthenticated } from '../Guards/EnsureAuthenticated';
import { EnsureUserEmailVerified } from '../Guards/EnsureUserEmailVerified';
import { EnsureActiveSubscriptionOrRedirect } from '../Guards/EnsureActiveSubscriptionOrRedirect';

import '@/style/pages/Dashboard/Dashboard.scss';

const SetupWizardPage = lazy(
  () => import('@/containers/Setup/WizardSetupPage'),
);

const BillingPage = lazy(
  () => import('@/containers/Subscriptions/BillingPage'),
);

/**
 * Dashboard inner private pages.
 */
export default function DashboardPrivatePages() {
  return (
    <EnsureAuthenticated>
      <EnsureUserEmailVerified>
        <PrivatePagesProvider>
          {/* Render DrawersContainer here so it's not blocked by subscription checks */}
          <DrawersContainer />
          
          <Switch>
            {/* Billing page is NOT protected by subscription check */}
            <Route path={'/billing'} exact>
              <BillingPage />
            </Route>
            
            {/* All other routes ARE protected by subscription check */}
            <Route path={'/'}>
              <EnsureActiveSubscriptionOrRedirect>
                <Switch>
                  <Route path={'/setup'}>
                    <SetupWizardPage />
                  </Route>
                  <Route path={'/'}>
                    <EnsureOrganizationIsReady>
                      <Dashboard />
                    </EnsureOrganizationIsReady>
                  </Route>
                </Switch>
              </EnsureActiveSubscriptionOrRedirect>
            </Route>
          </Switch>
        </PrivatePagesProvider>
      </EnsureUserEmailVerified>
    </EnsureAuthenticated>
  );
}
