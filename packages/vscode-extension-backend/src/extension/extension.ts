/*
 * Copyright 2020 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BackendManagerService } from "@redhat/backend/dist/api";
import { BackendExtensionApi } from "@redhat/backend/dist/channel-api";
import { DefaultHttpBridge } from "@redhat/backend/dist/http-bridge";
import { QuarkusLocalServer } from "@redhat/backend/dist/node";
import { VsCodeTestScenarioRunnerService } from "@redhat/backend/dist/vscode";
import * as path from "path";
import * as vscode from "vscode";

let backendManager: BackendManagerService;

export async function activate(context: vscode.ExtensionContext): Promise<BackendExtensionApi> {
  console.info("Backend extension is alive.");

  backendManager = new BackendManagerService({
    bridge: new DefaultHttpBridge(),
    localHttpServer: new QuarkusLocalServer(context.asAbsolutePath(path.join("dist", "server", "quarkus-runner.jar"))),
    bootstrapServices: [],
    lazyServices: [new VsCodeTestScenarioRunnerService()]
  });

  await backendManager.start();

  return { backendManager: backendManager };
}

export function deactivate() {
  backendManager?.stop();
}
