/*
 * Copyright 2011 JBoss, by Red Hat, Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.jboss.errai.ioc.client.container;

import java.lang.annotation.Annotation;
import java.util.Collections;
import java.util.HashSet;

/**
 * @author Mike Brock
 */
public class IOCDependentBean<T> extends AbstractIOCBean<T> {
  private CreationalCallback<T> creationalCallback;
  
  private IOCDependentBean(Class<T> type, Annotation[] qualifiers, CreationalCallback<T> creationalCallback) {
    this.type = type;
    this.qualifiers = new HashSet<Annotation>();
    if (qualifiers != null) {
      Collections.addAll(this.qualifiers, qualifiers);
    }
    this.creationalCallback = creationalCallback;
  }

  public static <T> IOCBeanDef<T> newBean(Class<T> type, Annotation[] qualifiers,
                                                CreationalCallback<T> callback) {
    return new IOCDependentBean<T>(type, qualifiers, callback);
  }

  @Override
  public T getInstance() {
    return creationalCallback.getInstance();
  }
}
