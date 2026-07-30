import { Request, Response } from "express";
import { CommitteeService } from "./committee.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/apiResponse";
import { sendPaginatedResponse } from "../../utils/paginatedResponse";
import { QueryDto } from "../../shared/query/query.dto";

const committeeService = new CommitteeService();

/**
 * Create Committee Member
 */
export const createCommittee = asyncHandler(
  async (req: Request, res: Response) => {
    const committee = await committeeService.create(req.body);

    return sendResponse(
      res,
      201,
      "Committee member created successfully.",
      committee
    );
  }
);

/**
 * Get All Committee Members
 */
export const getCommittees = asyncHandler(
  async (req: Request, res: Response) => {
    const query: QueryDto = {
      page: req.query.page
        ? Number(req.query.page)
        : undefined,

      limit: req.query.limit
        ? Number(req.query.limit)
        : undefined,

      search: req.query.search as string | undefined,

      sortBy: req.query.sortBy as string | undefined,

      order: req.query.order as "asc" | "desc" | undefined,

      designation: req.query.designation as string | undefined,

      isActive:
        req.query.isActive !== undefined
          ? req.query.isActive === "true"
          : undefined,
    };

    const result = await committeeService.getAll(query);

    return sendPaginatedResponse(
      res,
      200,
      "Committee members fetched successfully.",
      result.data,
      result.total,
      result.page,
      result.limit
    );
  }
);

/**
 * Get Committee Member By ID
 */
export const getCommitteeById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const committee = await committeeService.update(
      id,
      req.body
    );

    return sendResponse(
      res,
      200,
      "Committee member fetched successfully.",
      committee
    );
  }
);

/**
 * Update Committee Member
 */
export const updateCommittee = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const committee = await committeeService.update(
      id,
      req.body
    );

    return sendResponse(
      res,
      200,
      "Committee member updated successfully.",
      committee
    );
  }
);

/**
 * Soft Delete Committee Member
 */
export const deleteCommittee = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const committee = await committeeService.update(
      id,
      req.body
    );

    return sendResponse(
      res,
      200,
      "Committee member deleted successfully."
    );
  }
);