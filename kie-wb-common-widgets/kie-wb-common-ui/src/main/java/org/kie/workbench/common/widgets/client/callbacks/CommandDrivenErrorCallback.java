/*
 * Copyright 2013 JBoss Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.kie.workbench.common.widgets.client.callbacks;

import java.util.HashMap;
import java.util.Map;

import org.jboss.errai.bus.client.api.messaging.Message;
import org.kie.uberfire.client.callbacks.HasBusyIndicatorDefaultErrorCallback;
import org.kie.uberfire.client.common.HasBusyIndicator;
import org.uberfire.commons.validation.PortablePreconditions;
import org.uberfire.mvp.Command;

/**
 * Error Callback that allows Commands to be defined to handled Exceptions
 */
public class CommandDrivenErrorCallback extends HasBusyIndicatorDefaultErrorCallback {

    private final Map<Class<? extends Throwable>, Command> commands = new HashMap<Class<? extends Throwable>, Command>();

    public CommandDrivenErrorCallback( final HasBusyIndicator view,
                                       final Map<Class<? extends Throwable>, Command> commands ) {
        super( view );
        this.commands.putAll( PortablePreconditions.checkNotNull( "commands",
                                                                  commands ) );
    }

    @Override
    public boolean error( final Message message,
                          final Throwable throwable ) {
        for ( Map.Entry<Class<? extends Throwable>, Command> e : commands.entrySet() ) {
            if ( e.getKey().getName().equals( throwable.getClass().getName() ) ) {
                e.getValue().execute();
                return false;
            }
        }
        return super.error( message,
                            throwable );
    }

}
