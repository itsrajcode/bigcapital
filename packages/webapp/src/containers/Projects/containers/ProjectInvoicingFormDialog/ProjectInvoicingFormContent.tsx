// @ts-nocheck
import React from 'react';
import { Form } from 'formik';

import ProjectInvoicingFormFields from './ProjectInvoicingFormFields';
import ProjectInvoicingFormFloatingActions from './ProjectInvoicingFormFloatingActions';

/**
 * Project Invoicing form content.
 */
export default function ProjectInvoicingFormContent({ isSubmitting }) {
  return (
    <Form>
      <ProjectInvoicingFormFields />
      <ProjectInvoicingFormFloatingActions isSubmitting={isSubmitting} />
    </Form>
  );
}
