import { Router } from "express";

import {
  createCommittee,
  getCommittees,
  getCommitteeById,
  updateCommittee,
  deleteCommittee,
} from "./committee.controller";

import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";
import { validate } from "../../middleware/validate";

import {
  createCommitteeSchema,
  updateCommitteeSchema,
  committeeIdSchema,
} from "./committee.validation";

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /committees:
 *   post:
 *     summary: Create a committee member
 *     tags:
 *       - Committee
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               designation:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Committee member created successfully.
 */
router.post(
  "/",
  authorize("committee.create"),
  validate(createCommitteeSchema),
  createCommittee
);

router.post(
  "/",
  authorize("committee.create"),
  validate(createCommitteeSchema),
  createCommittee
);

/**
 * @swagger
 * /committees:
 *   get:
 *     summary: Get all committee members
 *     tags:
 *       - Committee
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of committee members
 */
router.get(
  "/",
  authorize("committee.view"),
  getCommittees
);
router.get(
  "/",
  authorize("committee.view"),
  getCommittees
);

router.get(
  "/:id",
  authorize("committee.view"),
  validate(committeeIdSchema),
  getCommitteeById
);

/**
 * @swagger
 * /committees:
 *   get:
 *     summary: Get all committee members
 *     tags:
 *       - Committee
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of committee members
 */
router.get(
  "/",
  authorize("committee.view"),
  getCommittees
);
router.put(
  "/:id",
  authorize("committee.update"),
  validate(updateCommitteeSchema),
  updateCommittee
);

/**
 * @swagger
 * /committees:
 *   get:
 *     summary: Get all committee members
 *     tags:
 *       - Committee
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of committee members
 */
router.get(
  "/",
  authorize("committee.view"),
  getCommittees
);
router.delete(
  "/:id",
  authorize("committee.delete"),
  validate(committeeIdSchema),
  deleteCommittee
);

export default router;