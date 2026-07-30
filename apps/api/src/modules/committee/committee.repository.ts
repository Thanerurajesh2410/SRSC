import { Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma";
import {
  CreateCommitteeDto,
  UpdateCommitteeDto,
} from "./committee.dto";
import { QueryDto } from "../../shared/query/query.dto";
import { buildQuery } from "../../shared/query/query.helper";

export class CommitteeRepository {
  /**
   * Create Committee Member
   */
  async create(data: CreateCommitteeDto) {
    return prisma.committee.create({
      data,
    });
  }

  /**
   * Get All Committee Members
   */
  async findAll(query: QueryDto) {
    const options = buildQuery(query);

    const where: Prisma.CommitteeWhereInput = {
      deletedAt: null,

      ...(query.isActive !== undefined && {
        isActive: query.isActive,
      }),

      ...(query.designation && {
        designation: query.designation,
      }),

      ...(options.search && {
        OR: [
          {
            name: {
              contains: options.search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: options.search,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: options.search,
              mode: "insensitive",
            },
          },
        ],
      }),
    };

    const [data, total] = await Promise.all([
      prisma.committee.findMany({
        where,
        skip: options.skip,
        take: options.take,
        orderBy: {
          [options.sortBy]: options.order,
        },
      }),

      prisma.committee.count({
        where,
      }),
    ]);

    return {
      data,
      total,
      page: options.page,
      limit: options.limit,
    };
  }

  /**
   * Get Committee Member By ID
   */
  async findById(id: string) {
    return prisma.committee.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  /**
   * Find Committee Member By Email
   */
  async findByEmail(email: string) {
    return prisma.committee.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });
  }

  /**
   * Update Committee Member
   */
  async update(
    id: string,
    data: UpdateCommitteeDto
  ) {
    return prisma.committee.update({
      where: {
        id,
      },
      data,
    });
  }

  /**
   * Soft Delete Committee Member
   */
  async softDelete(id: string) {
    return prisma.committee.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}