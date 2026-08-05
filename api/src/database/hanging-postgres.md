Check if Postgres is still running

```

Get-Process postgres

```


Try running:

```
Get-Process postgres | Select-Object Id, ProcessName, StartTime
Get-Service *postgres*
```


Resource Monitor



Open:



```

resmon.exe

```



Go to:



```

CPU

```



Search Associated Handles.



Type:



```

postgres

```



or



```

postmaster.pid

```



You'll immediately see which process owns it.



Restart the PostgreSQL service



Instead of rebooting:



```

net stop postgresql-x64-18 

net start postgresql-x64-18 

```



or

```

Restart-Service postgresql-x64-18 

```









