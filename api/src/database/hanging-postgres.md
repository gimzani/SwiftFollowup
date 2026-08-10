
# Restart Postgres

Postgres might hang if the API was just 'closed' and not properly "shut-down"...

DO THIS TO RESTART POSTGRES:

*Open PowerShell as administrator, then:*

```
net stop postgresql-x64-18 
net start postgresql-x64-18 
```


## Other Options


Check if Postgres is still running

```
Get-Process postgres
```


Try running:

```
Get-Process postgres | Select-Object Id, ProcessName, StartTime
Get-Service *postgres*
```



### Resource Monitor

Open:

```
resmon.exe
```

Go to: CPU --> Search Associated Handles


Type:

```
postgres
```

or

```
postmaster.pid
```

You'll immediately see which process owns it.
