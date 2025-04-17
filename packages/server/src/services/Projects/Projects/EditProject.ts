import { Knex } from 'knex';
import { Service, Inject } from 'typedi';
import moment from 'moment';
import {
  IProjectEditDTO,
  IProjectEditedEventPayload,
  IProjectEditEventPayload,
  IProjectEditingEventPayload,
  IProjectEditPOJO,
} from '@/interfaces';
import HasTenancyService from '@/services/Tenancy/TenancyService';
import UnitOfWork from '@/services/UnitOfWork';
import { EventPublisher } from '@/lib/EventPublisher/EventPublisher';
import events from '@/subscribers/events';
import { ProjectsValidator } from './ProjectsValidator';

@Service()
export default class EditProjectService {
  @Inject()
  private uow: UnitOfWork;

  @Inject()
  private tenancy: HasTenancyService;

  @Inject()
  private eventPublisher: EventPublisher;

  @Inject()
  private projectsValidator: ProjectsValidator;

  /**
   * Edits a new credit note.
   * @param {number} tenantId -
   * @param {number} projectId -
   * @param {IProjectEditDTO} projectDTO -
   */
  public editProject = async (
    tenantId: number,
    projectId: number,
    projectDTO: IProjectEditDTO
  ): Promise<IProjectEditPOJO> => {
    const { Project } = this.tenancy.models(tenantId);

    // Create a copy of the DTO to avoid modifying the original
    const updatedDTO = { ...projectDTO };

    // Format the deadline date to YYYY-MM-DD
    if (updatedDTO.deadline) {
      const formattedDate = moment(updatedDTO.deadline).format('YYYY-MM-DD');
      updatedDTO.deadline = formattedDate;
    }

    // Validate customer existance.
    const oldProject = await Project.query().findById(projectId).throwIfNotFound();
    
    // Validate the project's contact id existance.
    if (oldProject.contactId !== updatedDTO.contactId) {
      await this.projectsValidator.validateContactExists(
        tenantId,
        updatedDTO.contactId
      );
    }
    // Triggers `onProjectEdit` event.
    await this.eventPublisher.emitAsync(events.project.onEdit, {
      tenantId,
      oldProject,
      projectDTO: updatedDTO,
    } as IProjectEditEventPayload);

    // Edits the given project under unit-of-work envirement.
    return this.uow.withTransaction(tenantId, async (trx: Knex.Transaction) => {
      // Triggers `onProjectEditing` event.
      await this.eventPublisher.emitAsync(events.project.onEditing, {
        tenantId,
        projectDTO: updatedDTO,
        oldProject,
        trx,
      } as IProjectEditingEventPayload);

      // Upsert the project object.
      const project = await Project.query(trx).upsertGraph({
        id: projectId,
        ...updatedDTO,
      });
      // Triggers `onProjectEdited` event.
      await this.eventPublisher.emitAsync(events.project.onEdited, {
        tenantId,
        oldProject,
        project,
        projectDTO: updatedDTO,
        trx,
      } as IProjectEditedEventPayload);

      return project;
    });
  };
}
