import { RedirectResponse, errorResponse, successResponse } from "@/lib/api";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { storageCreateFormSchema } from "@/lib/zodschema";
import { z } from "zod";

type Data = z.infer<typeof storageCreateFormSchema>;

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return errorResponse("U dont have permission to view this page.", 401);
    }

    const body = (await req.json()) as Data;

    const storageExists = await db.storage.findUnique({
      where: {
        name: body.name,
      },
    });

    if (storageExists) {
      return errorResponse("Storage with provided name already exist.", 409);
    }

    const userHaveStorage = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        storage: true,
      },
    });

    if (!userHaveStorage) {
      return errorResponse("U dont have permission to view this page.", 401);
    }

    if (userHaveStorage.storage)
    {
      return RedirectResponse("/dashboard");
    }

    await db.storage.create({
      data: {
        name: body.name,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return successResponse(undefined, {
      status: 201,
    });
  } catch (error) {
    console.error("[Storage Create] There was an error. ", error);
    return errorResponse(`Something went wrong. ${error}`);
  }
}
