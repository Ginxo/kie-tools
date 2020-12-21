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

import * as React from "react";
import { KeyBindingsHelpOverlay } from "../../../envelope/KeyBindingsHelpOverlay";
import { DefaultKeyboardShortcutsService } from "@redhat/keyboard-shortcuts/dist/envelope";
import { ChannelType, OperatingSystem } from "@redhat/channel-common-api";
import { fireEvent, render } from "@testing-library/react";
import { DEFAULT_TESTING_ENVELOPE_CONTEXT, usingEditorEnvelopeI18nContext, usingEnvelopeContext } from "../utils";

describe("KeyBindingsHelpOverlay", () => {
  test("minimal setup", async () => {
    const context = { operatingSystem: OperatingSystem.WINDOWS, channel: ChannelType.DESKTOP };
    const keyboardShortcutsService = new DefaultKeyboardShortcutsService({ os: context.operatingSystem });
    keyboardShortcutsService.registerKeyPress("ctrl+c", "Copy", () => Promise.resolve(), {});

    const component = render(
      usingEditorEnvelopeI18nContext(
        usingEnvelopeContext(<KeyBindingsHelpOverlay />, {
          context: context,
          services: {
            ...DEFAULT_TESTING_ENVELOPE_CONTEXT.services,
            keyboardShortcuts: keyboardShortcutsService
          }
        }).wrapper
      ).wrapper
    );

    fireEvent.click(component.getByTestId("keyboard-shortcuts-help-overlay-icon"));

    await component.findByTestId("keyboard-shortcuts-help-overlay");
    await component.findByText("Copy");

    expect(component.baseElement).toMatchSnapshot();
  });
});
