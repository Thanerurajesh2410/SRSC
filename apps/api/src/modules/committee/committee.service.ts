import { CommitteeRepository } from "./committee.repository";
import {
  CreateCommitteeDto,
  UpdateCommitteeDto,
} from "./committee.dto";
import { AppError } from "../../errors/AppError";
import { QueryDto } from "../../shared/query/query.dto";

const repository = new CommitteeRepository();

export class CommitteeService {
  /**
   * Create Committee Member
   */
  async create(data: CreateCommitteeDto) {
    if (data.email) {
      const existingMember = await repository.findByEmail(data.email);

      if (existingMember) {
        throw new AppError(
          "Committee member with this email already exists.",
          409
        );
      }
    }

    return repository.create(data);
  }

  /**
   * Get All Committee Members
   */
  async getAll(query: QueryDto) {
    return repository.findAll(query);
  }

  /**
   * Get Committee Member By ID
   */
  async getById(id: string) {
    const committee = await repository.findById(id);

    if (!committee) {
      throw new AppError(
        "Committee member not found.",
        404
      );
    }

    return committee;
  }

  /**
   * Update Committee Member
   */
  async update(
    id: string,
    data: UpdateCommitteeDto
  ) {
    const committee = await repository.findById(id);

    if (!committee) {
      throw new AppError(
        "Committee member not found.",
        404
      );
    }

    if (data.email && data.email !== committee.email) {
      const existingMember = await repository.findByEmail(
        data.email
      );

      if (existingMember) {
        throw new AppError(
          "Committee member with this email already exists.",
          409
        );
      }
    }

    return repository.update(id, data);
  }

  /**
   * Soft Delete Committee Member
   */
  async delete(id: string) {
    const committee = await repository.findById(id);

    if (!committee) {
      throw new AppError(
        "Committee member not found.",
        404
      );
    }

    await repository.softDelete(id);

    return {
      message: "Committee member deleted successfully.",
    };
  }
}